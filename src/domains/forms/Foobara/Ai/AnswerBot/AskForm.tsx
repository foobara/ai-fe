import React, { useState, useEffect, type JSX } from 'react'

import ReactMarkdown from 'react-markdown'

import { type Outcome } from '../../../..//base/Outcome'

import { Ask } from '../../../../Foobara/Ai/AnswerBot/Ask'
import type AskInputs from '../../../../Foobara/Ai/AnswerBot/Ask/Inputs'
import type AskResult from '../../../../Foobara/Ai/AnswerBot/Ask/Result'
import { type Error as AskError } from '../../../../Foobara/Ai/AnswerBot/Ask/Errors'
import { ListModels } from '../../../../Foobara/Ai/AnswerBot/ListModels'
import type ListModelsResult from '../../../../Foobara/Ai/AnswerBot/ListModels/Result'
import { type Error as ListModelsError } from '../../../../Foobara/Ai/AnswerBot/ListModels/Errors'

import { type model } from '../../../../Foobara/Ai/AnswerBot/Types/model'
import { type service } from '../../../../Foobara/Ai/AnswerBot/Types/service'
import { type Model } from '../../../../Foobara/Ai/AnswerBot/Types/Model'

type ModelsByService = Record<service, Model[]>

interface ModelResult {
  modelId: model
  result: string | null
  error: string | null
  loading: boolean
}

export default function AskForm (): JSX.Element {
  const [question, setQuestion] = useState<string | undefined>(undefined)
  const [selectedModels, setSelectedModels] = useState<model[]>([])
  const [modelResults, setModelResults] = useState<ModelResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loadingModels, setLoadingModels] = useState<boolean>(false)
  const [modelsByService, setModelsByService] = useState<ModelsByService>({})

  useEffect(() => {
    const fetchModels = async (): Promise<void> => {
      setLoadingModels(true)
      try {
        const command = new ListModels({})
        const outcome: Outcome<ListModelsResult, ListModelsError> = await command.run()

        if (outcome.isSuccess()) {
          const models = outcome.result
          const groupedModels: ModelsByService = {}

          models.forEach(model => {
            if (!groupedModels[model.service]) {
              groupedModels[model.service] = []
            }
            groupedModels[model.service].push({
              id: model.id,
              service: model.service
            })
          })

          setModelsByService(groupedModels)
        } else {
          setError(`Failed to load models: ${outcome.errorMessage}`)
        }
      } catch (err) {
        setError(`Error loading models ${JSON.stringify(err)}`)
      } finally {
        setLoadingModels(false)
      }
    }

    void fetchModels()
  }, [])

  // Update modelResults when selectedModels changes
  useEffect(() => {
    // Remove results for unselected models
    setModelResults(prev => prev.filter(result => selectedModels.includes(result.modelId)))

    // Add entries for newly selected models
    const newModelResults = selectedModels
      .filter(modelId => !modelResults.some(result => result.modelId === modelId))
      .map(modelId => ({
        modelId,
        result: null,
        error: null,
        loading: false
      }))

    if (newModelResults.length > 0) {
      setModelResults(prev => [...prev, ...newModelResults])
    }
  }, [selectedModels])

  function toVoid (fn: () => Promise<void>): () => void {
    return (): void => {
      void (async (): Promise<void> => { await fn() })()
    }
  }

  const askWithModel = async (modelId: model): Promise<void> => {
    if (question == null) {
      return
    }

    // Update this model's status to loading
    setModelResults(prev =>
      prev.map(result =>
        result.modelId === modelId
          ? { ...result, loading: true, result: 'Thinking...', error: null }
          : result
      )
    )

    const inputs: AskInputs = {
      question,
      model: modelId
    }

    const command = new Ask(inputs)

    try {
      const outcome: Outcome<AskResult, AskError> = await command.run()

      if (outcome.isSuccess()) {
        const resultData: AskResult = outcome.result
        const resultText = typeof resultData === 'string' ? resultData : JSON.stringify(resultData)

        setModelResults(prev =>
          prev.map(result =>
            result.modelId === modelId
              ? { ...result, loading: false, result: resultText, error: null }
              : result
          )
        )
      } else {
        setModelResults(prev =>
          prev.map(result =>
            result.modelId === modelId
              ? { ...result, loading: false, result: null, error: outcome.errorMessage }
              : result
          )
        )
      }
    } catch (error) {
      setModelResults(prev =>
        prev.map(result =>
          result.modelId === modelId
            ? { ...result, loading: false, result: null, error: 'Error executing command' }
            : result
        )
      )
    }
  }

  const runAll = toVoid(async (): Promise<void> => {
    if (question == null || selectedModels.length === 0) {
      return
    }

    setError(null)

    // Launch all model queries in parallel
    selectedModels.forEach(modelId => {
      void askWithModel(modelId)
    })
  })

  const handleModelToggle = (modelId: model): void => {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId)
      } else {
        return [...prev, modelId]
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && question && selectedModels.length > 0) {
      runAll()
    }
  }

  // Check if any model result is being processed or has been processed
  const hasAsked = modelResults.some(result => result.loading || result.result || result.error)

  return (
    <div className="CommandForm">
      <div>
        {!loadingModels && (
          <div className="question-container">
            <input
              type="text"
              value={question ?? ''}
              onChange={(e) => { setQuestion(e.target.value) }}
              onKeyDown={handleKeyDown}
              placeholder="Enter your question here"
            />
            <button
              onClick={runAll}
              disabled={selectedModels.length === 0 || !question}
            >
              Ask Selected Models ({selectedModels.length})
            </button>
          </div>
        )}

        {hasAsked && (
          <div className="results-container">
            {modelResults.map(result => (
              <div key={result.modelId} className="model-result">
                <h4>{result.modelId}</h4>
                {result.loading && <p>Thinking...</p>}
                {result.error && <p className="error-message">{result.error}</p>}
                {result.result && !result.loading && (
                  <div className="markdown-result">
                    <ReactMarkdown>{result.result}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="models-container">
          {loadingModels
            ? (
              <p>Loading models...</p>
              )
            : (
                Object.entries(modelsByService).map(([service, models]) => (
                  <div key={service} className="service-group">
                    <h3>{service}</h3>
                    <div className="model-checkboxes">
                      {models.map((model) => (
                        <div key={model.id} className="model-checkbox">
                          <input
                            type="checkbox"
                            id={model.id}
                            checked={selectedModels.includes(model.id)}
                            onChange={() => { handleModelToggle(model.id) }}
                      />
                          <label htmlFor={model.id}>{model.id}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

    </div>
  )
}
