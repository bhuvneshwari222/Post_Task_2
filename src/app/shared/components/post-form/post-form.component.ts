import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ipost } from '../../models/posts';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnChanges {
  isInEditMode: boolean = false;
  @ViewChild('postForm') postForm !: NgForm;
  @Output() emitNewPost: EventEmitter<Ipost> = new EventEmitter<Ipost>();
  @Input() getEditPost !: Ipost;
  @Output() emitUpdatedPost: EventEmitter<Ipost> = new EventEmitter<Ipost>();

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getEditPost'].currentValue) {
      this.isInEditMode = true;
      this.postForm.form.patchValue(this.getEditPost);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  onSubmitPost() {
    if (this.postForm.valid) {
      let newPost: Ipost = {
        ...this.postForm.value,
        postID: Date.now().toString()
      }
      this.emitNewPost.emit(newPost);
      this.postForm.resetForm();
    }
  }

  updatePost() {
    if (this.postForm.valid) {
      let updatedPost: Ipost = {
        ...this.postForm.form.value,
        postID: this.getEditPost.postID
      }
      this.emitUpdatedPost.emit(updatedPost)
      this.isInEditMode = false;
      this.postForm.resetForm();
    }
  }

}
