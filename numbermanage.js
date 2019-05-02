var naming = [
    [1000, 'k'],
    [1000000, 'm'],
    [1000000000, 'b'],
    [1000000000000, 't'],
    [1000000000000000, 'q'],
    [1000000000000000000, 'aa'],
    [1000000000000000000000, 'ab'],
    [1000000000000000000000000, 'ac'],
    [1000000000000000000000000000, 'ad'],
    [1000000000000000000000000000000, 'ae'],
    [1000000000000000000000000000000000, 'af'],
    [1000000000000000000000000000000000000, 'ag'],
    [1000000000000000000000000000000000000000, 'ah'],
    [1000000000000000000000000000000000000000000, 'ai']
].reverse()

function tostring (num) {
    var outnumber = num
    var found = false

    naming.forEach(function(value) {
        var thresh = value[0]
        var name = value[1]

        if (num >= thresh) {
            if (!found) {
                outnumber = Number( num / thresh ).toFixed( 2 ) + name
            }
            found = true
        }
    })
    return outnumber
}