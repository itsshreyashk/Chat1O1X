"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Handle {
    constructor() {
        this.users = [];
        this.queue = [];
        this.queue_1f = [];
        this.queue_2f = [];
    }
    extinctUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeUserfromList(id);
            yield this.removeUsertoQueue(id);
            yield this.removeUserfromSplittedQueue(id);
        });
    }
    addUsertoList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users.push(id);
        });
    }
    removeUserfromList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.users.includes(id)) {
                this.users = this.users.filter(userId => userId !== id);
            }
            else {
                NaN;
            }
        });
    }
    addUsertoQueue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.queue.push(id);
        });
    }
    removeUsertoQueue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.queue.includes(id)) {
                this.queue = this.queue.filter(userId => userId !== id);
            }
            else {
                NaN;
            }
        });
    }
    isQueueEven() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queue.length % 2 === 0 && this.queue.length >= 4;
        });
    }
    splitQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            const middlePoint = this.queue.length / 2;
            this.queue_1f = this.queue_1f.concat(this.queue.slice(0, middlePoint));
            this.queue_2f = this.queue_2f.concat(this.queue.slice(middlePoint));
            yield this.removeNullElements();
        });
    }
    getMatch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const indexInQueue1f = this.queue_1f.indexOf(id);
            if (indexInQueue1f !== -1 && indexInQueue1f < this.queue_2f.length) {
                return this.queue_2f[indexInQueue1f];
            }
            else {
                return null; // No match found
            }
        });
    }
    removeUserfromSplittedQueue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.queue_1f.includes(id)) {
                this.queue_1f = this.queue_1f.filter(userId => userId !== id);
                const indexInQueue1f = this.queue_1f.indexOf(id);
                this.queue_2f.splice(indexInQueue1f, 1); // Corrected usage of splice
            }
            else if (this.queue_2f.includes(id)) {
                this.queue_2f = this.queue_2f.filter(userId => userId !== id);
                const indexInQueue2f = this.queue_2f.indexOf(id);
                this.queue_1f.splice(indexInQueue2f, 1); // Corrected usage of splice
            }
            else {
                NaN;
            }
        });
    }
    removeNullElements() {
        return __awaiter(this, void 0, void 0, function* () {
            this.queue_1f = this.queue_1f.filter(userId => userId !== null);
            this.queue_2f = this.queue_2f.filter(userId => userId !== null);
        });
    }
}
exports.default = Handle;
