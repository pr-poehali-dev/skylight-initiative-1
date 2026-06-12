import type React from "react"

interface TerminalOutputProps {
  terminalLines: string[]
  isInteractive: boolean
  isExitSequenceActive: boolean
  userInput: string
  showInputCursor: boolean
  inputRef: React.RefObject<HTMLInputElement>
  onUserInputChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

function getLineClassName(line: string): string {
  if (line && line.includes("whitespace-pre")) return ""

  if (
    (line && line.includes("ВТОРЖЕНИЕ_ОБНАРУЖЕНО")) ||
    (line && line.includes("ЦЕЛЬ_ЗАХВАЧЕНА")) ||
    (line && line.includes("[ТРЕВОГА]")) ||
    (line && line.includes("АВАРИЙНЫЙ")) ||
    (line && line.includes("ВНИМАНИЕ:")) ||
    (line && line.includes("КРИТИЧЕСКАЯ ОШИБКА")) ||
    (line && line.includes("СБОЙ СИСТЕМЫ")) ||
    (line && line.includes("СКОМПРОМЕТИРОВАНО"))
  ) return "text-red-400 font-bold"

  if (line && line.startsWith("$")) return "text-green-400"
  if (line && line.startsWith("root@impulse")) return "text-green-400 font-bold"

  if (
    line &&
    (line.includes("[ДОСТУП ЗАПРЕЩЁН]") ||
      line.includes("Внимание:") ||
      line.includes("Уязвимости") ||
      line.includes("Ошибка сегментации") ||
      line.includes("Переполнение стека"))
  ) return "text-red-400 font-bold"

  if (
    line &&
    (line.includes("браузер=") ||
      line.includes("платформа=") ||
      line.includes("разрешение=") ||
      line.includes("глубина_цвета=") ||
      line.includes("часовой_пояс=") ||
      line.includes("сетевая_трассировка:") ||
      line.includes("отпечаток:") ||
      line.includes("@codeimpulse") ||
      line.includes("github.com/codeimpulse"))
  ) return "text-green-400"

  if (
    line &&
    (line.includes("АНАЛИЗ_ЗАВЕРШЁН") ||
      line.includes("ЗАПИСЬ_СЕССИИ") ||
      line.includes("[ИНФО]") ||
      line.includes("Прогресс:") ||
      line.includes("успешно") ||
      line.includes("завершено") ||
      line.includes("предоставлен") ||
      line.includes("100%") ||
      line.includes("Удаление"))
  ) return "text-yellow-400"

  return "text-muted-foreground"
}

export function TerminalOutput({
  terminalLines,
  isInteractive,
  isExitSequenceActive,
  userInput,
  showInputCursor,
  inputRef,
  onUserInputChange,
  onKeyDown,
}: TerminalOutputProps) {
  return (
    <div className="p-8 font-mono">
      <div className="text-left space-y-1">
        {terminalLines.map((line, index) => (
          <p
            key={index}
            className={getLineClassName(line)}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}

        {isInteractive && !isExitSequenceActive && (
          <div className="flex items-center mt-2">
            <span className="text-green-400 font-bold">root@impulse:~#</span>
            <div className="relative flex-1 ml-1">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => onUserInputChange(e.target.value)}
                onKeyDown={onKeyDown}
                className="bg-transparent border-none outline-none text-muted-foreground font-mono w-full"
                autoComplete="off"
                spellCheck={false}
                placeholder="Введите 'помощь' для списка команд..."
              />
              <span
                className={`absolute left-0 top-0 ${showInputCursor ? "opacity-100 text-green-400 font-bold text-lg" : "opacity-0"} transition-opacity duration-100 pointer-events-none`}
                style={{ left: userInput.length > 0 ? `${userInput.length * 0.6}em` : "0" }}
              >
                _
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
