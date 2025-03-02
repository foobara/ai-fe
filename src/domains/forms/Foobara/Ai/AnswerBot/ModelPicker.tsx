import React, { useState, useEffect, type JSX } from 'react'

import { type Outcome } from '../../../..//base/Outcome'

import { ListModels } from '../../../../Foobara/Ai/AnswerBot/ListModels'
import type ListModelsResult from '../../../../Foobara/Ai/AnswerBot/ListModels/Result'
import { type Error as ListModelsError } from '../../../../Foobara/Ai/AnswerBot/ListModels/Errors'

import { type model_enum } from '../../../../Foobara/Ai/AnswerBot/Types/model_enum'
import { type service_enum } from '../../../../Foobara/Ai/AnswerBot/Types/service_enum'
import { type Model } from '../../../../Foobara/Ai/AnswerBot/Types/Model'

type ModelsByService = Record<service_enum, Model[]>

interface ModelPickerProps {
  selectedModels: model_enum[]
  setSelectedModels: (models: model_enum[]) => void
  modelsReady: () => void
}

export default function ModelPicker (
  { selectedModels, setSelectedModels, modelsReady }: ModelPickerProps
): JSX.Element {
  const [error, setError] = useState<string | null>(null)
  const [modelsByService, setModelsByService] = useState<ModelsByService | null>(null)

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
          modelsReady()
        } else {
          setError(`Failed to load models: ${outcome.errorMessage}`)
        }
      } catch (err) {
        setError(`Error loading models ${JSON.stringify(err)}`)
      }
    }

    void fetchModels()
  }, [])

  const handleModelToggle = (modelId: model_enum): void => {
    if (selectedModels.includes(modelId)) {
      setSelectedModels(selectedModels.filter(id => id !== modelId))
    } else {
      setSelectedModels([...selectedModels, modelId])
    }
  }

  return (
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

      {error != null && <p className="error-message">{error}</p>}
    </div>
  )
}
