import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

export interface Tweet {
  id?: number;
  text: string;
  author: string;
  date: any;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  title = "angular-todo-list";
  tweets: any;
  tweetText: string = "wswsdsdfdsgs";
  newId: number;

  constructor(private db: AngularFireDatabase) {
    db.list("/tweets")
      .valueChanges()
      .subscribe(e => {
        this.tweets = e;
      });
  }

  submit() {
    this.newId = this.tweets.length + 1;

    let tweet: Tweet = {
      id: this.newId,
      text: this.tweetText,
      author: "CNN",
      date: new Date().toLocaleDateString()
    };

    this.db.list("/tweets").push(tweet);
    this.tweetText = "";
  }
}
