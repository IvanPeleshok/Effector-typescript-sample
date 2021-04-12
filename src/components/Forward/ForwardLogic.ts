import { attach, combine, createDomain, createStore, forward, sample } from 'effector';
import { ReposController } from '../../api/api';
import { alert } from '../../utils/showAlert';

class ForwardLogic {
    label = "Enter profile name on github"   
    
    constructor() {
        forward({from: this.submitForm, to: this.infoProfile});
    }

    domain = createDomain('forwardDomain');
    submitForm = this.domain.event<string>('submitForm');

    infoProfile = sample({
        clock: this.submitForm, 
        fn: (clock) => {
            if (this.getReposFx.pending) 
                alert('Profile: ' + clock);
            },
        name: 'infoProfile',
    });

    event = this.domain.event()
    getReposFx = this.domain.effect('getReposFx', {handler: async (name: string) => {
        try {
            return await ReposController.getRepos(name);
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

    // combine = () => {
    //     let combineStroe = combine({a: this.$store, b:this.$store}, s => s);
    //     let combineAsDomain = combine([this.submitForm, this.$store]);
    // }

    forward = () => {

        forward({from: this.submitForm, to: this.getReposFx});
        forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
    

        sample({
            clock: this.submitForm,
            source: this.submitForm.map(p => createStore(p)),
            fn: (val, clock) => {
                console.log(val);
                return clock;
            },
            target: this.getReposFx
        });

        sample(this.submitForm.map(p => createStore(p)), this.submitForm, console.log);
    }

    attach = () => {
        let created = attach({
            effect: this.getReposFx,
            source: this.$store,
            mapParams: (params: string, states: string[]) => {
                console.log(params, states);
                return params;
            }
        });
        forward({from: this.submitForm, to: created});
        forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
    }

    sample = () => {
        sample({clock: this.submitForm, target: this.getReposFx});
        sample({clock: this.getReposFx.doneData.map(({data}) => data), target: this.$store});
        sample(this.submitForm.map(p => createStore(p)), this.submitForm, console.log);
    }
}

export default new ForwardLogic();