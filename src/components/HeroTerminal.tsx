import type React from "react"
import { useState, useEffect, useRef } from "react"
import { TerminalBSOD } from "@/components/TerminalBSOD"
import { TerminalOutput } from "@/components/TerminalOutput"
import { processCommand, fetchIPInfo, EXIT_SEQUENCE } from "@/components/terminalCommands"

interface HeroTerminalProps {
  onExitTriggered?: (isExiting: boolean) => void
}

const FULL_TEXT = "код импульс"

export function HeroTerminal({ onExitTriggered }: HeroTerminalProps) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTypingLine, setIsTypingLine] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [showInputCursor, setShowInputCursor] = useState(true)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showBSOD, setShowBSOD] = useState(false)
  const [isExitSequenceActive, setIsExitSequenceActive] = useState(false)
  const [countdown, setCountdown] = useState(7)
  const [showRestartButton, setShowRestartButton] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const exitTimeoutsRef = useRef<NodeJS.Timeout[]>([])
  const ipInfoRef = useRef("IP_СКРЫТ | ЛОКАЦИЯ_ЗАШИФРОВАНА | СЕТЬ_ЗАЩИЩЕНА")

  const clearExitTimeouts = () => {
    exitTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
    exitTimeoutsRef.current = []
  }

  const executeExit = async () => {
    clearExitTimeouts()

    setIsExitSequenceActive(true)
    setIsInteractive(false)
    onExitTriggered?.(true)

    setTerminalLines([])

    const initialTimeout = setTimeout(async () => {
      let lineIndex = 0
      let charIndex = 0

      const typeExitSequence = () => {
        if (lineIndex >= EXIT_SEQUENCE.length) {
          const bsodTimeout = setTimeout(() => {
            setShowBSOD(true)
            setCountdown(7)
          }, 500)
          exitTimeoutsRef.current.push(bsodTimeout)
          return
        }

        const currentLine = EXIT_SEQUENCE[lineIndex]

        if (charIndex === 0 && currentLine !== "") {
          setTerminalLines((prev) => [...prev, ""])
        }

        if (currentLine === "") {
          setTerminalLines((prev) => [...prev, ""])
          lineIndex++
          charIndex = 0
          setTimeout(typeExitSequence, 25)
          return
        }

        if (charIndex < currentLine.length) {
          const partialLine = currentLine.slice(0, charIndex + 1)
          setTerminalLines((prev) => {
            const newLines = [...prev]
            newLines[newLines.length - 1] = partialLine
            return newLines
          })
          charIndex++

          const typingSpeed = currentLine.includes("$")
            ? 2.5
            : currentLine.includes("ПАНИКА ЯДРА") || currentLine.includes("КРИТИЧ")
              ? 3.75
              : currentLine.includes("ИМПУЛЬС")
                ? 1.875
                : Math.random() * 1.25 + 1

          setTimeout(typeExitSequence, typingSpeed)
        } else {
          charIndex = 0
          lineIndex++

          const pauseTime = currentLine.includes("$")
            ? 25
            : currentLine.includes("КРИТИЧ") || currentLine.includes("СБОЙ")
              ? 37.5
              : 12.5

          setTimeout(typeExitSequence, pauseTime)
        }
      }

      typeExitSequence()
    }, 500)
    exitTimeoutsRef.current.push(initialTimeout)
  }

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isExitSequenceActive) return

    if (e.key === "Enter" && userInput.trim()) {
      const command = userInput.trim()
      const response = processCommand(command, setTerminalLines, executeExit)

      setCommandHistory((prev) => [...prev, command])
      setHistoryIndex(-1)

      if (response[0] === "CLEAR_SCREEN") {
        setTerminalLines([])
      } else {
        setTerminalLines((prev) => [...prev, `root@impulse:~# ${command}`, ...response, ""])
      }

      setUserInput("")

      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setUserInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setUserInput("")
        } else {
          setHistoryIndex(newIndex)
          setUserInput(commandHistory[newIndex])
        }
      }
    }
  }

  useEffect(() => {
    const detectUserMetadata = async () => {
      const screen = `${window.screen.width}x${window.screen.height}`
      const viewport = `${window.innerWidth}x${window.innerHeight}`
      const userAgent = navigator.userAgent
      const platform = navigator.platform
      const language = navigator.language
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const colorDepth = window.screen.colorDepth
      const pixelRatio = window.devicePixelRatio

      const fingerprint = btoa(userAgent + platform + screen).slice(0, 16)

      let lineIndex = 0
      let charIndex = 0

      const typeCharacter = () => {
        const currentIpInfo = ipInfoRef.current

        const lines = [
          "",
          '<span class="text-cyan-400">$ traceroute целевой_хост</span>',
          `<span class="text-yellow-400">сетевая_трассировка:</span> <span class="text-white">${currentIpInfo}</span>`,
          "",
          '<span class="text-cyan-400">$ md5sum /dev/urandom | head -c 16</span>',
          `<span class="text-yellow-400">отпечаток:</span> <span class="text-orange-400">${fingerprint}</span><span class="text-gray-400">...</span>`,
          "",
          '<span class="text-cyan-400">$ cat /proc/метаданные_пользователя</span>',
          `<span class="text-yellow-400">браузер=</span><span class="text-green-300">"${userAgent}"</span>`,
          `<span class="text-yellow-400">платформа=</span><span class="text-green-300">"${platform}"</span> <span class="text-yellow-400">язык=</span><span class="text-green-300">"${language}"</span>`,
          `<span class="text-yellow-400">разрешение=</span><span class="text-green-300">"${screen}"</span> <span class="text-yellow-400">viewport=</span><span class="text-green-300">"${viewport}"</span>`,
          `<span class="text-yellow-400">глубина_цвета=</span><span class="text-green-300">"${colorDepth}бит"</span> <span class="text-yellow-400">плотность=</span><span class="text-green-300">"${pixelRatio}x"</span>`,
          `<span class="text-yellow-400">часовой_пояс=</span><span class="text-green-300">"${timezone}"</span>`,
          "",
        ]

        if (lineIndex >= lines.length) {
          setIsInteractive(true)
          return
        }

        const currentLine = lines[lineIndex]

        if (charIndex === 0) {
          setIsTypingLine(true)
          setTerminalLines((prev) => [...prev, ""])
        }

        if (charIndex < currentLine.length) {
          const partialLine = currentLine.slice(0, charIndex + 1)
          setTerminalLines((prev) => {
            const newLines = [...prev]
            newLines[newLines.length - 1] = partialLine
            return newLines
          })
          charIndex++

          const typingSpeed = currentLine.startsWith("$")
            ? 2.5
            : currentLine.includes("ALERT")
              ? 3.75
              : currentLine.includes("сетевая_трассировка")
                ? 1.875
                : Math.random() * 1.25 + 1

          setTimeout(typeCharacter, typingSpeed)
        } else {
          setIsTypingLine(false)
          charIndex = 0
          lineIndex++

          const pauseTime =
            currentLine === "" ? 6.25 : currentLine.startsWith("$") ? 25 : currentLine.includes("ALERT") ? 37.5 : 12.5

          setTimeout(typeCharacter, pauseTime)
        }
      }

      typeCharacter()

      fetchIPInfo(1).then((ipInfo) => {
        ipInfoRef.current = ipInfo
        setTerminalLines((prev) =>
          prev.map((line) =>
            line.includes("сетевая_трассировка:")
              ? `<span class="text-yellow-400">сетевая_трассировка:</span> <span class="text-white">${ipInfo}</span>`
              : line,
          ),
        )
      })
    }

    detectUserMetadata()

    let i = 0
    const typeTimer = setInterval(() => {
      if (i < FULL_TEXT.length) {
        setDisplayText(FULL_TEXT.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeTimer)
      }
    }, 4.75)

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 125)

    const inputCursorTimer = setInterval(() => {
      setShowInputCursor((prev) => !prev)
    }, 100)

    return () => {
      clearInterval(typeTimer)
      clearInterval(cursorTimer)
      clearInterval(inputCursorTimer)
      clearExitTimeouts()
    }
  }, [])

  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if (window.innerWidth > 768 && isInteractive && !isExitSequenceActive) {
        const target = e.target as HTMLElement
        const isInputElement =
          target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true"

        if (!isInputElement && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          inputRef.current?.focus()
        }
      }
    }

    document.addEventListener("keydown", handleGlobalKeydown)
    return () => document.removeEventListener("keydown", handleGlobalKeydown)
  }, [isInteractive, isExitSequenceActive])

  useEffect(() => {
    if (showBSOD && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (showBSOD && countdown === 0) {
      setShowRestartButton(true)
    }
  }, [showBSOD, countdown])

  const handleManualRestart = () => {
    window.location.reload()
  }

  if (showBSOD) {
    return (
      <TerminalBSOD
        countdown={countdown}
        showRestartButton={showRestartButton}
        onRestart={handleManualRestart}
      />
    )
  }

  return (
    <section className="flex flex-col justify-start items-center relative overflow-hidden py-8">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 rounded-lg overflow-hidden border border-green-500/30 shadow-[0_0_30px_rgba(0,255,65,0.15)]">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/80 border-b border-green-500/20">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="ml-4 text-xs text-green-400/70 font-mono">celestial-client://preview.exe</span>
            </div>
            <img
              src="https://cdn.poehali.dev/projects/a7e95e36-5107-4742-a4ec-355dee66661e/files/c5142b35-afb9-4261-a317-210166972803.jpg"
              alt="Celestial Client Preview"
              className="w-full object-cover max-h-72"
            />
          </div>

          <div className="bg-card border border-border rounded-lg shadow-2xl mb-8 flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/20 flex-shrink-0">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="ml-4 text-xs text-muted-foreground font-mono">терминал://codeimpulse.dev</span>
            </div>

            <TerminalOutput
              terminalLines={terminalLines}
              isInteractive={isInteractive}
              isExitSequenceActive={isExitSequenceActive}
              userInput={userInput}
              showInputCursor={showInputCursor}
              inputRef={inputRef}
              onUserInputChange={setUserInput}
              onKeyDown={handleInputSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
