//It is a utility function that wraps an async function for express route handlers.
// It catches any errors that are thrown and passes them to the next() function.

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

 
export { asyncHandler }
