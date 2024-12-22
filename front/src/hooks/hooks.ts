import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, ms = 500) => {
    const [debounceValue, setDebounceValue] = useState<T>(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, ms)

        return () => clearTimeout(timeout)
    }, [value, ms])

    return debounceValue
}