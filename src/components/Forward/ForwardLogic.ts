import { createDomain, forward } from 'effector';
import { ReposController } from '../../api/api';
import { alert } from '../../utils/showAlert';

class ForwardLogic {
    label = "Enter profile name on github"    
    domain = createDomain('forwardDomain');
    submitForm = this.domain.createEvent<string>('submitForm');

    getReposFx = this.domain.createEffect('getReposFx', {handler: async (name: string) => {
        try {
            return await ReposController.getRepos(name);
        } catch {
            alert('This profile does not exist');
        }
    }});

    $store = this.domain.createStore(null, {name: "$store"});

    unWatchDone = this.getReposFx.done.watch(({params}) => alert('Profile:' + params));

    init = () => {
        forward({from: this.submitForm, to: this.getReposFx});
        forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
    }
}

export default new ForwardLogic();