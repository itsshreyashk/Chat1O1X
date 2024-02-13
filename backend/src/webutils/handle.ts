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
    async addUsertoList(id: string) {
        this.users.push(id);
    }
    async removeUserfromList(id: string) {
        this.users = this.users.filter(userId => userId !== id);
    }
    async addUsertoQueue(id: string) {
        this.queue.push(id);
    }
    async removeUsertoQueue(id: string) {
        this.queue = this.queue.filter(userId => userId !== id);
    }

    async isQueueEven() {
        return this.queue.length % 2 === 0 && this.queue.length > 0;
    }
    async splitQueue() {
        const middlePoint = this.queue.length / 2;
        this.queue_1f = this.queue_1f.concat(this.queue.slice(0, middlePoint));
        this.queue_2f = this.queue_2f.concat(this.queue.slice(middlePoint));

        await this.removeNullElements();
    }
    async getMatch(id: string) {
        const indexInQueue1f = this.queue_1f.indexOf(id);
        if (indexInQueue1f !== -1 && indexInQueue1f < this.queue_2f.length) {
            return this.queue_2f[indexInQueue1f];
        } else {
            return null; // No match found
        }
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