import app from './app'

const PORT = +process.env.PORT | 3000
app.listen(PORT, () => {
    console.log(`Base express project running on port ${PORT}`)
})
