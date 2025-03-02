import React, { useState, type JSX } from 'react'

import { type model_enum } from '../../../../../Foobara/Ai/AnswerBot/Types/model_enum'

import AskCard from './AskCard'
import ModelPicker from './ModelPicker'

export default function AskForm (): JSX.Element {
  const [question, setQuestion] = useState<string | undefined>(undefined)
  const [selectedModels, setSelectedModels] = useState<model_enum[]>([])
  const [modelsReady, setModelsReady] = useState<boolean>(false)
  const [asking, setAsking] = useState<model_enum[]>([])
  const [error, setError] = useState<string | null>(null)
  const [askedAt, setAskedAt] = useState<null | number>(null)

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && question != null && selectedModels.length > 0) {
      runAll()
    }
  }

  return (
    <div className="CommandForm">
      <div>
        {modelsReady && (
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

        <ModelPicker
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
          modelsReady={() => { setModelsReady(true) }}
        />
      </div>

      {error != null && <p className="error-message">{error}</p>}

    </div>
  )
}
