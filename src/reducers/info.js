let defaultInfo = {
    version: '1.8.26',
    releasedate: new Date(2019,11,24,10,52,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
