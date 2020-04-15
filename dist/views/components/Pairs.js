import {dbManager} from '../../app.js';


let Pairs = {




    render: async () => {

        // Db.getPairs().then(done => {
        //     console.log(pairs);
        // })


        let markup = '';
        pairs.forEach(pair => {
            console.log(pair.id);
            let view = /*html*/ `
            <li>
            <button class="change">${pair.id}</button>
            </li>
            `;
            markup += view;
        });

        document.getElementById('userpairs').insertAdjacentHTML('afterbegin', markup);
    },

    after_render: async () => {

    },
    addPair: async () => {

        dbManager.addPair();


    }

}

export default Pairs;
