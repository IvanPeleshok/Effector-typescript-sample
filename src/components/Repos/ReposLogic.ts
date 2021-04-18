import { attach, combine, createDomain, createStore, forward, guard, restore, sample, split } from 'effector';
import { reposController } from '../../api/api';
import { alert, showAlert } from '../../utils/showAlert';

class ReposLogic {
    constructor() {
        forward({from: this.getReposFx.fail, to: this.alertFx});
    }

    label = "Enter profile name on github"; 

    domain = createDomain('forwardDomain');
    submitForm = this.domain.event<string>('submitForm');
    
    event = this.domain.event();
    
    alertFx = this.domain.effect('alertFx', {
        handler: 
            () => alert('This profile does not exist')
    });

    getReposFx = this.domain.effect('getReposFx', {
        handler: 
            async (name: string) => {
                let res = await reposController.getRepos(name);
                return res;
    }});

    // this.getReposFx.use(async (params) => {
    //     try {
    //          let res = await reposController.getRepos(name);
    //          return res;
    // });

    $store = this.domain.store(null, {name: "$store"});
    $defaultName = this.domain.store('zerobias', {name: "$defaultName"});

    init = () => {
        forward({from: this.submitForm, to: this.getReposFx}); // unsub
        forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});

        alert(`Когда вызывается событие, то с переданными аргументами будет вызван эффект,
            после чего, когда придёт ответ с сервера, его содержимое будет помещено в хранилище`);
    };

    // init = () => {
    //     sample({clock: this.submitForm, source: this.$defaultName, target: this.getReposFx});
    //     sample({clock: this.getReposFx.doneData, fn: ({data}) => data,target: this.$store});

    //     alert(`Когда будет вызвано событие, то значение хранилища $defaultName будет передано в эффект с вызовом,
    //         после чего, когда придёт ответ с сервера, его необходимое содержимое будет помещено в хранилище`);
    // };

    // init = () => {
    //     sample(this.$defaultName, [this.submitForm, this.submitForm], (source, clock) => this.getReposFx(source));
    //     forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
    //     alert(`Когда будет вызвано любое событие в массиве, то значение хранилища $defaultName будет передано в эффект с вызовом,
    //         после чего, когда придёт ответ с сервера, его необходимое содержимое будет помещено в хранилище`);
    // }

    // init = () => {
    //     let createRequest = attach({effect: this.getReposFx, 
    //                                 source: combine({a: this.$defaultName}), 
    //                                 mapParams: (params: {name: string}, source) => params.name});
    //     createRequest({name: this.$defaultName.defaultState});
    //     forward({from: createRequest.doneData.map(({data}) => data), to: this.$store});

    //     alert(`Возможность создания нового эффекта `);
    // };

    // init = () => {
    //     let create = attach({effect: this.getReposFx, source: this.$defaultName});
    //     forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
    //     create();

    //     alert(`Создан новый эффект, который берёт из стора значение и передаёт, как аргумент для вызова`);
    // }

    // init = () => {
    //     let event = guard({
    //         source: this.$store,
    //         filter: (s) => s.length > 10,
    //     });
    //     forward({from: this.$store, to: this.event});
    //     event.watch(() => alert('$store updated'));

    //     forward({from: this.submitForm, to: this.getReposFx});
    //     forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});

    //     alert('Событие создастся, когда массив в data length > 10');
    // }

    // init = () => {
    //     // let newEvent = guard({source: sample(this.$defaultName, this.submitForm), filter: (state) => state.length > 10, target: this.getReposFx});
    //     let effect = guard({source: this.submitForm, filter: (params) => params.length > 5, target: this.getReposFx});
    //     forward({from: effect.doneData.map(({data}) => data), to: this.$store});
    //     // forward({from: this.submitForm.filter({fn: (params) => params.length > 5}), to: this.getReposFx})
    //     alert(`Создан эффект, который будет вызван, если введено больше 5 символов`);
    // }   


    // init = () => {
    //     let showAlertFx = this.domain.effect('showAlertFx', {
    //         handler: 
    //         (params: string) => {
    //             alert('Некорректный ввод: ' + params);
    //         }
    //     });

    //     split({
    //         source: this.submitForm,
    //         match: {
    //             rule: params => params.length > 5
    //         },
    //         cases: {
    //             rule: this.getReposFx,
    //             __: showAlertFx,
    //         }
    //     });
    //     forward({from: this.getReposFx.done.map((params) => params.result.data), to: this.$store});
    // }
   
    // init = () => {
    //     forward({from: this.submitForm, to: this.getReposFx});
    //     const store = restore(this.getReposFx.doneData, null);
    //     forward({from: store.updates.map((store) => store?.data), to: this.$store});
    //     alert('Будет создано событие, когда придёт ответ с сервера');
    // }

}

export default new ReposLogic();