var Ajax = {
    getData(subreddit) {
        subreddit = subreddit || 'all';
        var url = 'https://www.reddit.com/r/' + subreddit + '.json?limit=100';
        return fetch(url)
            .catch((error) => {
                console.error(error);
            });
    }
};
export default Ajax;
