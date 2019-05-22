const express = require('express');

const {isLoggedIn} = require('./middlewares');
const {User} = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, mext) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}});
        await user.addFollowing(parseInt(req.params.id, 10));
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:id/unfollow', isLoggedIn, async (req, res, mext) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}});
        await user.removeFollowing(parseInt(req.params.id, 10));
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/modnick', isLoggedIn, async (req, res, mext) => {
    try {
        await User.update({
            nick: req.query.modnick,
        }, {
            where: {id: req.user.id},
        });
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;