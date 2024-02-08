function index(req, res) {
    const posts = 'post lists';
    res.send(posts);
}

module.exports = {
    index: index,
}