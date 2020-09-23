import useLocalStorage from "./useLocalStorage";

export default function useSettings() {
    const [settings, setSettings] = useLocalStorage('settings', {})

    return {
        settings,
        setSettings,
    }
}