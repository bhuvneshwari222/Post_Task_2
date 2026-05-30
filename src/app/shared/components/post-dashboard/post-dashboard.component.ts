import { Component, OnInit } from '@angular/core';
import { Ipost } from '../../models/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  postArr: Ipost[] = []
  editPostObj !: Ipost;

  constructor(
    private _matDialog: MatDialog,
    private _snackbar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.postArr = [
      {
        title: "Angular Basics",
        postID: "POST101",
        content: "Introduction to Angular components and modules.",
        isCompleted: true
      },
      {
        title: "Reactive Forms",
        postID: "POST105",
        content: "Building dynamic and reactive forms using Angular.",
        isCompleted: false
      },
      {
        title: "TypeScript Interfaces",
        postID: "POST102",
        content: "Understanding interfaces and strong typing in TypeScript.",
        isCompleted: true
      },
      {
        title: "CRUD Operations",
        postID: "POST103",
        content: "Learn how to perform Create, Read, Update and Delete operations.",
        isCompleted: true
      },
      {
        title: "Routing in Angular",
        postID: "POST104",
        content: "A guide to navigation and routing in Angular applications.",
        isCompleted: false
      }
    ];
  }

  getNewPost(newPost: Ipost) {
    this.postArr.unshift(newPost);
  }

  getRemoveID(removeID: string) {
    let config = new MatDialogConfig();
    config.data = `Are you sure, you want to remove this post`;
    config.width = '400px';
    config.disableClose = true;
    let dialogRef = this._matDialog.open(GetConfirmComponent, config)
    dialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            let getIndex = this.postArr.findIndex(p => p.postID === removeID);
            this.postArr.splice(getIndex, 1);
            this._snackbar.openSnackBar(`The post with id ${removeID} is removed sucessfully!!!`)
          }
        },
        error: err => {
          this._snackbar.openSnackBar(err.msg);
        }
      })
  }

  getEditPost(editPst: Ipost) {
    this.editPostObj = editPst;
  }

  getUpdatedPost(updatedPost: Ipost) {
    let getIndex = this.postArr.findIndex(p => p.postID === updatedPost.postID)
    this.postArr[getIndex] = updatedPost;
    this._snackbar.openSnackBar(`The post with id ${updatedPost.postID} is updated successfully!!!`)
  }

}
