export default {
    method: 'POST',
    path: '/submit',
    async handler (req, tool) {
        const data = req.payload;

        if (!data['*to']) return tool.response({"message": 'Error: form name Required'}).code(500);
        if (!data['*formname']) return context.tool.status.badData({"message": 'Error: form name Required'});

        const options = {
            $name: data['*formname'], // required
            $domain: req.info.referrer, // required
            $byName: 'Arc IO', // required
            $byDomain: 'arcdev.io', // required
        }

        for (const name in data) {
            if (name in options || name === '*formname') {
                continue;
            } else {
                options[name] = data[name]
            }
        }

        const emaily = new Emaily();
        const { text, html, csv } = await emaily.template(options);
        const body = {
            text,
            html,
            subject: data['*formname'],
            to: [ data['*to'] ],
            from: '"No Reply" <noreply@arcdev.io>',
            // attachments: [ { name: 'customer.csv', data: csv } ]
        };

        if (data['*cc']) {
            body.cc = [];
            body.cc.push(data['*cc']);
        }

        const result = await emaily.send(body);

        return { title: 'success', message: 'form submitted' };
    }
},
