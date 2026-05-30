import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipost } from '../../models/posts';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() getPostArr !: Ipost[];
  @Output() emitRemoveID : EventEmitter<string> = new EventEmitter<string>();
  @Output() emitEditPost: EventEmitter<Ipost> = new EventEmitter<Ipost>();

  constructor() { }

  ngOnInit(): void {
  }


  onRemove(removeID: string){
    this.emitRemoveID.emit(removeID);
  }

  onEdit(editPost: Ipost){
    this.emitEditPost.emit(editPost);
  }
  
  trackByPostID(index: number, post: Ipost){
    return post.postID;
  }
}
