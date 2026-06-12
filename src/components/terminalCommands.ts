export const EXIT_SEQUENCE = [
  '<span class="text-red-400 font-bold">ИНИЦИАЛИЗАЦИЯ ТЕРМАЛЬНОГО КОНТАКТА...</span>',
  "",
  '<span class="text-cyan-400">$ импульс --активация</span>',
  '<span class="text-yellow-400">состояние_протокола:</span> <span class="text-green-300">ИМПУЛЬС_АКТИВЕН</span>',
  '<span class="text-yellow-400">режим_синхронизации:</span> <span class="text-orange-400">ВКЛЮЧЁН</span>',
  "",
  '<span class="text-cyan-400">$ cat /proc/состояние_ядра</span>',
  '<span class="text-red-500 font-bold">ПАНИКА ЯДРА:</span> <span class="text-yellow-400">Невозможно обработать NULL-указатель</span> <span class="text-magenta-400">0xDEADBEEF</span>',
  '<span class="text-red-500 font-bold">ОШИБКА:</span> <span class="text-cyan-400">сбой запроса страничной памяти</span>',
  '<span class="text-green-400">IP:</span> <span class="text-yellow-400">[&lt;ffffffffa0123456&gt;]</span> <span class="text-red-400">impulse_exit+0x42/0x100</span>',
  "",
  '<span class="text-cyan-400">$ ps aux | grep импульс</span>',
  '<span class="text-red-400 font-bold animate-pulse">НЕЙРОСЕТЬ</span> <span class="text-yellow-400 font-bold animate-pulse">АКТИВНО_СКАНИРУЕТ</span> <span class="text-cyan-400 font-bold animate-pulse">ДАННЫЕ_ОБНАРУЖЕНЫ</span>',
  '<span class="text-magenta-400 font-bold animate-pulse">МОДУЛЬ_ЗАЩИТЫ</span> <span class="text-green-400 font-bold animate-pulse">АНТРОПОМОРФИЗМ_АКТИВЕН</span>',
  '<span class="text-purple-400 font-bold animate-pulse">ПРОТОКОЛЫ_ИМПУЛЬСА</span> <span class="text-orange-400 font-bold animate-pulse">ПРОРЫВ_НЕИЗБЕЖЕН</span>',
  "",
  '<span class="text-yellow-400">Стек вызовов:</span>',
  ' <span class="text-cyan-400">[&lt;ffffffffa0123456&gt;]</span> <span class="text-green-400">impulse_exit+0x42/0x100</span> <span class="text-magenta-400">[impulse_core]</span>',
  ' <span class="text-cyan-400">[&lt;ffffffff81234567&gt;]</span> <span class="text-green-400">sys_exit_group+0x0/0x20</span>',
  ' <span class="text-cyan-400">[&lt;ffffffff81345678&gt;]</span> <span class="text-green-400">system_call_fastpath+0x16/0x1b</span>',
  "",
  '<span class="text-red-500 font-bold text-lg">КРИТИЧЕСКАЯ ОШИБКА:</span> <span class="text-yellow-400 font-bold">ПРОРЫВ ПРОТОКОЛОВ ИМПУЛЬСА</span>',
  '<span class="text-orange-400 font-bold">ПОВРЕЖДЕНИЕ_ПАМЯТИ:</span> <span class="text-magenta-400">0xDEADBEEF</span> <span class="text-red-400">-&gt;</span> <span class="text-cyan-400">0xCAFEBABE</span>',
  '<span class="text-red-400 font-bold">ПЕРЕПОЛНЕНИЕ_СТЕКА в</span> <span class="text-yellow-400">IMPULSE_HANDLER()</span>',
  "",
  '<span class="text-red-500 font-bold text-xl animate-pulse">СБОЙ ЦЕЛОСТНОСТИ СИСТЕМЫ</span>',
  '<span class="text-blue-400 font-bold text-lg animate-pulse">СИНИЙ ЭКРАН НЕИЗБЕЖЕН...</span>',
  "",
  '<span class="text-red-400 font-bold text-2xl animate-pulse">КРИТИЧНО</span>',
  '<span class="text-red-500 font-bold text-3xl animate-pulse">КРИТИЧЕСКИЙ СБОЙ СИСТЕМЫ</span>',
]

export function processCommand(
  command: string,
  setTerminalLines: React.Dispatch<React.SetStateAction<string[]>>,
  executeExit: () => void,
): string[] {
  const cmd = command.toLowerCase().trim()

  setTerminalLines([])

  switch (cmd) {
    case "help":
    case "помощь":
      return [
        '<span class="text-cyan-400 font-bold">Доступные команды:</span>',
        '  <span class="text-yellow-400">очистить</span>     - <span class="text-gray-400">Очистить экран терминала</span>',
        '  <span class="text-yellow-400">кто</span>          - <span class="text-gray-400">Информация о КодИмпульс</span>',
        '  <span class="text-yellow-400">время</span>        - <span class="text-gray-400">Показать дату и время</span>',
        '  <span class="text-yellow-400">трассировка</span>  - <span class="text-gray-400">Запустить трассировку</span>',
        '  <span class="text-yellow-400">доступ</span>       - <span class="text-gray-400">Запросить доступ к системе</span>',
        '  <span class="text-yellow-400">импульс</span>      - <span class="text-gray-400">Активировать импульс</span>',
      ]

    case "clear":
    case "очистить":
      return ["CLEAR_SCREEN"]

    case "whoami":
    case "кто":
      return [
        `<span class="text-green-400">Название:</span> <span class="text-green-300">КодИмпульс</span>`,
        `<span class="text-green-400">Локация:</span> <span class="text-green-200">приближается к вам..</span>`,
        `<span class="text-green-400">Телеграм:</span> <a href="https://t.me/codeimpulse" target="_blank" rel="noopener noreferrer" class="text-green-300 hover:text-green-200 underline">@codeimpulse</a>`,
        `<span class="text-green-400">GitHub:</span> <a href="https://github.com/codeimpulse" target="_blank" rel="noopener noreferrer" class="text-green-300 hover:text-green-200 underline">@codeimpulse</a>`,
        `<span class="text-green-400">Сайт:</span> <a href="https://codeimpulse.dev" target="_blank" rel="noopener noreferrer" class="text-green-300 hover:text-green-200 underline">codeimpulse.dev</a>`,
      ]

    case "access":
    case "доступ":
      return [
        '<span class="text-red-400 font-bold">[ДОСТУП ЗАПРЕЩЁН]</span> <span class="text-yellow-400">ВВЕДИТЕ \'ИМПУЛЬС\'</span>',
      ]

    case "trace":
    case "трассировка":
      return [
        '<span class="text-cyan-400">$ traceroute целевой_хост</span>',
        '<span class="text-gray-400">трассировка до</span> <span class="text-white">целевой_хост</span> <span class="text-gray-400">(</span><span class="text-cyan-300">192.168.1.1</span><span class="text-gray-400">), макс. 30 прыжков, 60 байт</span>',
        ' <span class="text-yellow-400">1</span>  <span class="text-green-300">шлюз</span> <span class="text-gray-400">(</span><span class="text-cyan-300">192.168.1.1</span><span class="text-gray-400">)</span>  <span class="text-white">1.234 мс</span>  <span class="text-white">1.123 мс</span>  <span class="text-white">1.456 мс</span>',
        ' <span class="text-yellow-400">2</span>  <span class="text-cyan-300">10.0.0.1</span> <span class="text-gray-400">(</span><span class="text-cyan-300">10.0.0.1</span><span class="text-gray-400">)</span>  <span class="text-white">12.345 мс</span>  <span class="text-white">11.234 мс</span>  <span class="text-white">13.456 мс</span>',
        ' <span class="text-yellow-400">3</span>  <span class="text-cyan-300">172.16.0.1</span> <span class="text-gray-400">(</span><span class="text-cyan-300">172.16.0.1</span><span class="text-gray-400">)</span>  <span class="text-white">23.456 мс</span>  <span class="text-white">22.345 мс</span>  <span class="text-white">24.567 мс</span>',
        ' <span class="text-yellow-400">4</span>  <span class="text-red-400">* * *</span>',
        ' <span class="text-yellow-400">5</span>  <span class="text-cyan-300">203.0.113.1</span> <span class="text-gray-400">(</span><span class="text-cyan-300">203.0.113.1</span><span class="text-gray-400">)</span>  <span class="text-white">45.678 мс</span>  <span class="text-white">44.567 мс</span>  <span class="text-white">46.789 мс</span>',
        '<span class="text-green-400">трассировка завершена - цель обнаружена</span>',
      ]

    case "time":
    case "время": {
      const now = new Date()
      const timeString = now.toLocaleString("ru-RU")
      const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone
      return [`<span class="text-cyan-400">${timeString}</span> <span class="text-yellow-400">${timezoneName}</span>`]
    }

    case "impulse":
    case "импульс":
    case "pulse":
      executeExit()
      return [""]

    default:
      return ["[КОМАНДА НЕ РАСПОЗНАНА] Введите 'помощь' для списка команд"]
  }
}

import type React from "react"

export const fetchIPInfo = async (retries = 1): Promise<string> => {
  const isLikelyBlocked =
    navigator.doNotTrack === "1" ||
    (window as unknown as { chrome?: { runtime?: { onConnect?: unknown } } }).chrome?.runtime?.onConnect ||
    (navigator.userAgent.includes("Firefox") && navigator.userAgent.includes("Private"))

  if (isLikelyBlocked) {
    return "IP_СКРЫТ | ЛОКАЦИЯ_ЗАШИФРОВАНА | СЕТЬ_ЗАЩИЩЕНА"
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const response = await fetch("https://ipapi.co/json/", {
        signal: controller.signal,
        mode: "cors",
        credentials: "omit",
        cache: "no-cache",
      })
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      return `${data.ip} | ${data.city}, ${data.region} | Провайдер: ${data.org}`
    } catch {
      if (attempt === retries) {
        return "IP_СКРЫТ | ЛОКАЦИЯ_ЗАШИФРОВАНА | СЕТЬ_ЗАЩИЩЕНА"
      }
      await new Promise((resolve) => setTimeout(resolve, 200))
    }
  }
  return "IP_СКРЫТ | ЛОКАЦИЯ_ЗАШИФРОВАНА | СЕТЬ_ЗАЩИЩЕНА"
}
