export default class Handle {
    private users: string[]; //contain all user ids that are present.
    private queue: string[]; //contain all users willing to connect.
    private queue_1f: string[]; //contain all users willing to connect, first half.
    private queue_2f: string[]; //contain all users willing to connect, second half.

    constructor() {
        this.users = [];
        this.queue = [];
        this.queue_1f = [];
        this.queue_2f = [];
    }
    async extinctUser(id: string) {
        await this.removeUserfromList(id);
        await this.removeUserfromQueue(id);
        await this.removeUserfromSplittedQueue(id);
    }
    async addUsertoList(id: string) {
        this.users.push(id);
    }
    async checkUserinList(id: string) {
        return this.users.includes(id);
    }
    async removeUserfromList(id: string) {
        if (this.users.includes(id)) {
            this.users = this.users.filter(userId => userId !== id);
        } else {
            NaN;
        }
    }
    async addUsertoQueue(id: string) {
        this.queue.push(id);
    }
    async checkUserinQueue(id: string) {
        return this.queue.includes(id);
    }
    async removeUserfromQueue(id: string) {
        if (this.queue.includes(id)) {
            this.queue = this.queue.filter(userId => userId !== id);
        } else {
            NaN;
        }
    }
    async isQueueEven() {
        return this.queue.length % 2 === 0 && this.queue.length >= 2;
    }
    async splitQueue() {
        const middlePoint = this.queue.length / 2;
        this.queue_1f = this.queue_1f.concat(this.queue.slice(0, middlePoint));
        this.queue_2f = this.queue_2f.concat(this.queue.slice(middlePoint));
        await this.removeNullElements();
    }
    async getMatch(id: string) {
        let indexInQueue1f = this.queue_1f.indexOf(id);
        let indexInQueue2f = this.queue_2f.indexOf(id);

        if (indexInQueue1f !== -1) {
            if (indexInQueue1f < this.queue_2f.length) {
                return this.queue_2f[indexInQueue1f];
            }
        } else if (indexInQueue2f !== -1) {
            if (indexInQueue2f < this.queue_1f.length) {
                return this.queue_1f[indexInQueue2f];
            }
        }
        return null; // Handle the case where a match is not found
    }

    async removeUserfromSplittedQueue(id: string) {
        if (this.queue_1f.includes(id)) {
            this.queue_1f = this.queue_1f.filter(userId => userId !== id);
            const indexInQueue1f = this.queue_1f.indexOf(id);
            this.queue_2f.splice(indexInQueue1f, 1); // Corrected usage of splice
        } else if (this.queue_2f.includes(id)) {
            this.queue_2f = this.queue_2f.filter(userId => userId !== id);
            const indexInQueue2f = this.queue_2f.indexOf(id);
            this.queue_1f.splice(indexInQueue2f, 1); // Corrected usage of splice
        } else {
            NaN;
        }
    }

    async removeNullElements() {
        this.queue_1f = this.queue_1f.filter(userId => userId !== null);
        this.queue_2f = this.queue_2f.filter(userId => userId !== null);
    }

}