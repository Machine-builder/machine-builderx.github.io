function bake_biscuit(key, value) {
    localStorage.setItem(key, value)
}

function inspect_biscuit(key) {
    let value = localStorage.getItem(key)
    return value
}

function eat_biscuit(key) {
    let value = localStorage.getItem(key)
    burn_biscuit( key )
    return value
}

function burn_biscuit(key) {
    localStorage.removeItem(key)
}

function burn_down_kitchen() {
    localStorage.clear()
}