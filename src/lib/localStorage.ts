export class localStorage {
    static getItem = (name: string) => {
        window.localStorage.getItem(name)
    }

    static setItem = (name: string, value: any) => {
        window.localStorage.setItem(name, value)
    }
}
