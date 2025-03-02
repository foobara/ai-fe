import React, { useState, useEffect, type JSX } from 'react'

import ReactMarkdown from 'react-markdown'

import { type Outcome } from '../../../..//base/Outcome'

import { Ask } from '../../../../Foobara/Ai/AnswerBot/Ask'
import type AskInputs from '../../../../Foobara/Ai/AnswerBot/Ask/Inputs'
import type AskResult from '../../../../Foobara/Ai/AnswerBot/Ask/Result'
import { type Error as AskError } from '../../../../Foobara/Ai/AnswerBot/Ask/Errors'

import { type model_enum } from '../../../../Foobara/Ai/AnswerBot/Types/model_enum'

interface AskCardProps {
  question: string
  modelId: model_enum
}

export default function AskCard ({ question, modelId }: AskCardProps): JSX.Element {
  const [startTime, setStartTime] = useState<null | number>(null)
  const [endTime, setEndTime] = useState<null | number>(null)
  const [error, setError] = useState<string | null>(null)
  const [outcome, setOutcome] = useState<Outcome<AskResult, AskError> | null>(null)

  useEffect(() => {
    const inputs: AskInputs = { question, model: modelId }
    const command: Ask = new Ask(inputs)

    const startTime = Date.now()
    command.run().then(setOutcome).catch(setError).finally(() => { setEndTime(Date.now()) })
    setStartTime(startTime)
  }, [])

  return (
    <div key={modelId} className="model-result">
      <h4>{modelId}</h4>
      {endTime != null && startTime != null && (
      <p className="response-time">{((startTime - endTime) / 1000).toFixed(2)}s</p>
      )}
      <div>
        {error == null
          ? (<p className="error-message">{JSON.stringify(error)}</p>)
          : (
              outcome == null
                ? (<p>Thinking...</p>)
                : (
                    outcome.isSuccess()
                      ? (<div className="markdown-result">
                        <ReactMarkdown>{outcome.result}</ReactMarkdown>
                      </div>)
                      : (<p className="error-message">{outcome.errorMessage}</p>)
                  )
            )
      }
      </div>
  </div>)
}
