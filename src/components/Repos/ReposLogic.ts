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
    //     sample({clock: this.getReposFx.doneData, fn: ({data}) => data, target: this.$store});

    //     alert(`Когда будет вызвано событие, то значение хранилища $defaultName будет передано в эффект с вызовом,
    //         после чего, когда придёт ответ с сервера, его необходимое содержимое будет помещено в хранилище`);
    // };

    // init = () => {
    //     let event = this.domain.event<void>("event");
    //     sample(this.$defaultName, this.submitForm, (source, clock) => event());
    // }

    // init = () => {
    //     let createRequest = attach({effect: this.getReposFx, 
    //                                 source: this.$defaultName, 
    //                                 mapParams: (params: {name: string}, source) => params.name});
    //     createRequest({name: 'github'});
    //     forward({from: createRequest.doneData.map(({data}) => data), to: this.$store});

    //     alert(`Возможность создания нового эффекта `);
    // };

    // init = () => {
    //     let effect = attach({effect: this.getReposFx, source: this.$defaultName});
    //     forward({from: effect.doneData.map(({data}) => data), to: this.$store});
    //     effect();

    //     alert(`Создан новый эффект, который берёт из стора значение и передаёт, как аргумент для вызова`);
    // }

    // init = () => {
    //     // let newEffect = guard({source: sample(this.$defaultName, this.submitForm), filter: (state) => state.length < 10, target: this.getReposFx});
    //     let effect = guard({source: this.submitForm, filter: (params) => params.length > 5, target: this.getReposFx});
    //     forward({from: effect.doneData.map(({data}) => data), to: this.$store});
    //     // forward({from: this.submitForm.filter({fn: (params) => params.length > 5}), to: this.getReposFx})
    //     alert(`Создан эффект, который будет вызван, если введено больше 5 символов`);
    // }   

    // init = () => {
    //     sample({
    //         clock: guard({
    //             clock: this.submitForm,
    //             filter: params => params.length > 5,
    //         }),
    //         source: this.$defaultName,
    //         fn: (source, clock) => clock,
    //         target: attach({
    //             effect: this.getReposFx,
    //             source: this.$defaultName,
    //             mapParams: (params, store) => params + store
    //         })
    //     });
    //     forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
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