module.exports = [
    {
        path: '/api/auth/',
        handler: rootRequire('app/api/authRoutes'),
    },
	// {
    //     path: '/books',
    //     handler: rootRequire('app/routes/BooksRoute'),
    // }
];
