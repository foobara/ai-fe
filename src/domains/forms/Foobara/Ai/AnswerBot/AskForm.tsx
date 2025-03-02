import React, { useState, useEffect, type JSX } from 'react'

import { type Outcome } from '../../../..//base/Outcome'

import { ListModels } from '../../../../Foobara/Ai/AnswerBot/ListModels'
import type ListModelsResult from '../../../../Foobara/Ai/AnswerBot/ListModels/Result'
import { type Error as ListModelsError } from '../../../../Foobara/Ai/AnswerBot/ListModels/Errors'

import { type model_enum } from '../../../../Foobara/Ai/AnswerBot/Types/model_enum'
import { type service_enum } from '../../../../Foobara/Ai/AnswerBot/Types/service_enum'
import { type Model } from '../../../../Foobara/Ai/AnswerBot/Types/Model'

import AskCard from './AskCard'

type ModelsByService = Record<service_enum, Model[]>

export default function AskForm (): JSX.Element {
  const [question, setQuestion] = useState<string | undefined>(undefined)
  const [selectedModels, setSelectedModels] = useState<model_enum[]>([])
  const [asking, setAsking] = useState<model_enum[]>([])
  const [error, setError] = useState<string | null>(null)
  const [modelsByService, setModelsByService] = useState<ModelsByService | null>(null)
  const [askedAt, setAskedAt] = useState<null | number>(null)

  useEffect(() => {
    const fetchModels = async (): Promise<void> => {
      const command = new ListModels({})

      try {
        const outcome: Outcome<ListModelsResult, ListModelsError> = await command.run()

        if (outcome.isSuccess()) {
          const models = outcome.result
          const groupedModels: ModelsByService = {
            'open-ai': [],
            ollama: [],
            anthropic: []
          }

          models.forEach(model => {
            groupedModels[model.service].push(model)
          })

          setModelsByService(groupedModels)
        } else {
          setError(`Failed to load models: ${outcome.errorMessage}`)
        }
      } catch (err) {
        setError(`Error loading models ${JSON.stringify(err)}`)
      }
    }

    void fetchModels()
  }, [])

  function toVoid (fn: () => Promise<void>): () => void {
    return (): void => {
      void (async (): Promise<void> => { await fn() })()
    }
  }

  const runAll = toVoid(async (): Promise<void> => {
    setAskedAt(Date.now())
    setAsking([...selectedModels])
    setError(null)
  })

  const handleModelToggle = (modelId: model_enum): void => {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId)
      } else {
        return [...prev, modelId]
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && question != null && selectedModels.length > 0) {
      runAll()
    }
  }

  return (
    <div className="CommandForm">
      <div>
        {modelsByService != null && (
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
              disabled={selectedModels.length === 0 || question == null}
            >
              Ask Selected Models ({selectedModels.length})
            </button>
          </div>
        )}

        {askedAt != null && asking.length > 0 && question != null && asking.map(modelId => (
          <AskCard key={`${modelId}-${askedAt}`} modelId={modelId} question={question} />
        ))}

        <div className="models-container">
          {modelsByService == null
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

      {error != null && <p className="error-message">{error}</p>}

    </div>
  )
}
