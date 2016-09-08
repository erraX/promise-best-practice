const colors = require('colors')

function pResolved(msg, order) {
    console.log(`[[RESOLVED]].[${order}]: ${JSON.stringify(msg)}`)
}

function pRejected(msg, order) {
    console.warn(`[[REJECTED]]`.red + `.[${order}]: ${JSON.stringify(msg)}`)
}

require('jsdom').env('', (err, window) => {
    if (err) {
        console.error(err)
        return
    }
 
    // jquery^3.1.0
    const $ = require('jquery')(window)

    const resolvedPromise = msg => {
        console.log(msg)
        return $.Deferred().resolve({
            status: 0,
            msg: 'a resolved promise'
        })
    }

    const rejectedPromise = msg => {
        console.log(msg)
        return $.Deferred().reject({
            status: 1,
            error: ' a rejected promise'
        })
    }

    // resolvedPromise(`
    //     ================================================
    //         Process resolved with \`then\`
    //         and return resolved value to next promise
    //     ================================================
    // `)
    // .then(
    //     res => {
    //         pResolved(res, 1)
    //         return res
    //     }
    // )
    // .then(
    //     res => {
    //         pResolved(res, 2)
    //         return res
    //     }
    // )

    // resolvedPromise(`
    //     ================================================
    //         Process resolved with \`done\`
    //         and return resolved value to next promise
    //     ================================================
    // `)
    // .done(
    //         res => {
    //             pResolved(res, 1)
    //             return res
    //         }
    // )
    // .done(
    //     res => {
    //         pResolved(res, 2)
    //         return res
    //     }
    // )

    resolvedPromise(`
        ================================================
            Process resolved with \`done\`
            and return resolved value to next promise
        ================================================
    `)
    .then(
        res => {
            pResolved(res, 1)
            throw res
        }
    )
    .then(
        res => {
            pResolved(res, 2)
            return res
        },
        err => {
            pRejected(err, 2)
            return err
        }
    )
    .then(
        res => {
            pResolved(res, 2)
            return res
        },
        err => {
            pRejected(err, 2)
            return err
        }
    )
})
