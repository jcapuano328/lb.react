let defaultInfo = {
    version: '1.0.6',
    releasedate: new Date(2017,1,25,16,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
