import { attach, createDomain, createStore, forward, guard, sample } from 'effector';
import { reposController } from '../../api/api';
import { alert } from '../../utils/showAlert';

class ReposLogic {
    label = "Enter profile name on github"   

    domain = createDomain('forwardDomain');
    submitForm = this.domain.event<string>('submitForm');

    
    event = this.domain.event()
    getReposFx = this.domain.effect('getReposFx', {handler: async (name: string) => {
        try {
            return await reposController.getRepos(name);
        } catch {
            alert('This profile does not exist');
        }
    }});

    // this.getReposFx.use(async (params) => {
    //     try {
    //         return await ReposController.getRepos(params);
    //     } catch {
    //         alert('This profile does not exist');
    //     }
    // });



    $store = this.domain.store(null, {name: "$store"});
    $defaultName = this.domain.store('zerobias', {name: "$defaultName"});

    init = () => {
        forward({from: this.submitForm, to: this.getReposFx});
        forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
    };

    // init = () => {
    //     sample({
    //         clock: this.submitForm,
    //         source: createStore('IvanPeleshok'),
    //         fn: (source, clock) => clock,
    //         target: this.getReposFx
    //     });
    //     sample({
    //         clock: this.getReposFx.doneData,
    //         fn: ({data}) => data,
    //         target: this.$store
    //     });

    // //   forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store}); // can be replaced with last sample
    // };

    // init = () => {
    //     let createRequest = attach({
    //         effect: this.getReposFx,
    //         source: this.$defaultName,
    //         mapParams: (data: {name: string}, source) => data.name // source 
    //     });
    //     createRequest({name: this.$defaultName.getState()});
    //     forward({from: createRequest.doneData.map(({data}) => data), to: this.$store});
    // };

    // init = () => {
    //     // let newEvent = guard({source: sample(this.$defaultName, this.submitForm), filter: (state) => state.length > 10, target: this.getReposFx});
    //     // let newEvent = guard({source: sample(this.$defaultName, this.submitForm), filter: (state) => state.length < 10, target: this.getReposFx});
    //     let newEvent = guard({source: this.submitForm, filter: (params) => params.length > 5, target: this.getReposFx});
    //     forward({from: newEvent.doneData.map(({data}) => data), to: this.$store});
    // }   

   
}

export default new ReposLogic();