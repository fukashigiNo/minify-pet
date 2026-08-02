export const getDeviseId = () => {
    if(typeof window === "undefined") return "server-side"

    let deviceId = localStorage.getItem("minify_device_id")

    if(!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("minify_device_id", deviceId);
    }

    return deviceId
}

export default getDeviseId