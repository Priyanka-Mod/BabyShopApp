class TestApi{
    static all(){
        return fetch('https://facebook.github.io/react-native/movies.json').then((res) => {
            return res.json();
        })
    }
    }
    

export default TestApi