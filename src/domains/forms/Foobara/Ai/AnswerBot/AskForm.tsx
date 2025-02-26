import React, { useState, type JSX } from 'react'

import { type Outcome } from '../../../..//base/Outcome'

import { Ask } from '../../../../Foobara/Ai/AnswerBot/Ask'
import type AskInputs from '../../../../Foobara/Ai/AnswerBot/Ask/Inputs'
import type AskResult from '../../../../Foobara/Ai/AnswerBot/Ask/Result'
import { type Error as AskError } from '../../../../Foobara/Ai/AnswerBot/Ask/Errors'

import { type model } from '../../../../Foobara/Ai/AnswerBot/Types/model'

export default function AskForm (): JSX.Element {
  const [question, setQuestion] = useState<string | undefined>(undefined)
  const [model, setModel] = useState<model | undefined>(undefined)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function toVoid (fn: () => Promise<void>): () => void {
    return (): void => {
      void (async (): Promise<void> => { await fn() })()
    }
  }

  const run = toVoid(async (): Promise<void> => {
    if (question == null) {
      // TODO: perform some kind of validation error
      return
    }

    if (model == null) {
      // TODO: perform some kind of validation error
      return
    }

    const inputs: AskInputs = {
      question,
      model
    }

    const command = new Ask(inputs)

    try {
      setResult('Thinking...')
      setError(null)
      const outcome: Outcome<AskResult, AskError> = await command.run()

      if (outcome.isSuccess()) {
        const result: AskResult = outcome.result
        setResult(typeof result === 'string' ? result : JSON.stringify(result))
      } else {
        setError(outcome.errorMessage)
        setResult(null)
      }
    } catch (error) {
      setError('Error executing command')
      setResult(null)
    }
  })

  return (
    <div className="CommandForm">
      <div>

        <input
          value={question ?? ''}
          onChange={(e) => { setQuestion(e.target.value) }}
          placeholder="question"
                  />

        <select
          value={model ?? ''}
          onChange={(e) => { setModel(e.target.value as model) }}
                >
          <option value="babbage-002">babbage-002</option><option value="chatgpt-4o-latest">chatgpt-4o-latest</option><option value="claude-2.0">claude-2.0</option><option value="claude-2.1">claude-2.1</option><option value="claude-3-5-haiku-20241022">claude-3-5-haiku-20241022</option><option value="claude-3-5-sonnet-20240620">claude-3-5-sonnet-20240620</option><option value="claude-3-5-sonnet-20241022">claude-3-5-sonnet-20241022</option><option value="claude-3-7-sonnet-20250219">claude-3-7-sonnet-20250219</option><option value="claude-3-haiku-20240307">claude-3-haiku-20240307</option><option value="claude-3-opus-20240229">claude-3-opus-20240229</option><option value="claude-3-sonnet-20240229">claude-3-sonnet-20240229</option><option value="dall-e-2">dall-e-2</option><option value="dall-e-3">dall-e-3</option><option value="davinci-002">davinci-002</option><option value="gpt-3.5-turbo">gpt-3.5-turbo</option><option value="gpt-3.5-turbo-0125">gpt-3.5-turbo-0125</option><option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option><option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option><option value="gpt-3.5-turbo-instruct">gpt-3.5-turbo-instruct</option><option value="gpt-3.5-turbo-instruct-0914">gpt-3.5-turbo-instruct-0914</option><option value="gpt-4">gpt-4</option><option value="gpt-4-0125-preview">gpt-4-0125-preview</option><option value="gpt-4-0613">gpt-4-0613</option><option value="gpt-4-1106-preview">gpt-4-1106-preview</option><option value="gpt-4-turbo">gpt-4-turbo</option><option value="gpt-4-turbo-2024-04-09">gpt-4-turbo-2024-04-09</option><option value="gpt-4-turbo-preview">gpt-4-turbo-preview</option><option value="gpt-4o">gpt-4o</option><option value="gpt-4o-2024-05-13">gpt-4o-2024-05-13</option><option value="gpt-4o-2024-08-06">gpt-4o-2024-08-06</option><option value="gpt-4o-2024-11-20">gpt-4o-2024-11-20</option><option value="gpt-4o-audio-preview">gpt-4o-audio-preview</option><option value="gpt-4o-audio-preview-2024-10-01">gpt-4o-audio-preview-2024-10-01</option><option value="gpt-4o-audio-preview-2024-12-17">gpt-4o-audio-preview-2024-12-17</option><option value="gpt-4o-mini">gpt-4o-mini</option><option value="gpt-4o-mini-2024-07-18">gpt-4o-mini-2024-07-18</option><option value="gpt-4o-mini-audio-preview">gpt-4o-mini-audio-preview</option><option value="gpt-4o-mini-audio-preview-2024-12-17">gpt-4o-mini-audio-preview-2024-12-17</option><option value="gpt-4o-mini-realtime-preview">gpt-4o-mini-realtime-preview</option><option value="gpt-4o-mini-realtime-preview-2024-12-17">gpt-4o-mini-realtime-preview-2024-12-17</option><option value="gpt-4o-realtime-preview">gpt-4o-realtime-preview</option><option value="gpt-4o-realtime-preview-2024-10-01">gpt-4o-realtime-preview-2024-10-01</option><option value="gpt-4o-realtime-preview-2024-12-17">gpt-4o-realtime-preview-2024-12-17</option><option value="llama3:8b">llama3:8b</option><option value="o1-mini">o1-mini</option><option value="o1-mini-2024-09-12">o1-mini-2024-09-12</option><option value="o1-preview">o1-preview</option><option value="o1-preview-2024-09-12">o1-preview-2024-09-12</option><option value="omni-moderation-2024-09-26">omni-moderation-2024-09-26</option><option value="omni-moderation-latest">omni-moderation-latest</option><option value="smollm2:135m">smollm2:135m</option><option value="text-embedding-3-large">text-embedding-3-large</option><option value="text-embedding-3-small">text-embedding-3-small</option><option value="text-embedding-ada-002">text-embedding-ada-002</option><option value="tts-1">tts-1</option><option value="tts-1-1106">tts-1-1106</option><option value="tts-1-hd">tts-1-hd</option><option value="tts-1-hd-1106">tts-1-hd-1106</option><option value="whisper-1">whisper-1</option>
        </select>

        <button onClick={run}>Ask</button>
      </div>

      {(result != null) && <p>{result}</p>}
      {(error != null) && <p className="error-message">{error}</p>}
    </div>
  )
}
