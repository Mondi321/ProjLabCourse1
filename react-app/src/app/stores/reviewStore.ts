import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Review } from "../models/review";

export default class ReviewStore{
    reviewRegistry = new Map<string, Review>();
    loading = true;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get reviews() {
        return Array.from(this.reviewRegistry.values());
    }

    private setReview = (review: Review) => {
        this.reviewRegistry.set(review.id!, review);
    }

    private getReview = (id: string) => {
        return this.reviewRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadReviews = async () => {
        this.setLoadingInitial(true);
        try {
            const reviews = await agent.Reviews.list();
            reviews.forEach(review => {
                this.setReview(review);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }


    loadReview = async (id: string) => {
        let review = this.getReview(id);
        this.loadingInitial = true;
        try {
            review = await agent.Reviews.details(id);
            this.setReview(review);
            this.setLoadingInitial(false);
            return review;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }



    createReview = async (review: Review) => {
        this.loading = false;
        try {
            await agent.Reviews.create(review);
            runInAction(() => {
                this.reviewRegistry.set(review.id!, review);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    updateReview = async (review: Review) => {
        this.loading = false;
        try {
            await agent.Reviews.update(review);
            runInAction(() => {
                this.reviewRegistry.set(review.id!, review);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deleteReview = async (id: string) => {
        window.location.reload();
        try {
            await agent.Reviews.delete(id);
            runInAction(() => {
                this.reviewRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }
}