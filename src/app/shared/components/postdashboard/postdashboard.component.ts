import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ipatch } from 'src/app/model/patch';
import { PatchService } from 'src/app/patch.service';
import { SnackbarService } from 'src/app/snackbar.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-postdashboard',
  templateUrl: './postdashboard.component.html',
  styleUrls: [ './postdashboard.component.scss' ]
})
export class PostdashboardComponent implements OnInit {


  constructor(
    private _patchservice: PatchService,
    private _snackbarservice: SnackbarService,
    private _auth: AuthService
  ) { }


  patchForm!: FormGroup

  arr !: Ipatch[]

  updateButton: boolean = false

  patchid !: string;





  ngOnInit(): void {

    this.patchForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    })

    this.getAllposts()
    console.log(localStorage.getItem('userid'))


  }

  getAllposts() {
    this._patchservice.getAllpost()
      .subscribe(res => {
        console.log(res)
        this.arr = res
        // console.log(this.arr)
      })
  }

  Onedit(id: string) {
    console.log(id)
    this.updateButton = true

    this._patchservice.getsinglepost(id)
      .subscribe(res => {
        console.log(res)

        this.patchForm.patchValue(res)

        this.patchid = id
      })
  }


  onpostformsubmit() {
    if (this.patchForm.valid) {
      this._patchservice.createPost(this.patchForm.value)
        .subscribe(res => {
          // console.log(res[ 'name' ], 'id get')
          // this.arr.unshift(res)
          // let obj = {
          //   ...this.patchForm.value,
          //   id: res[ 'name' ]
          // }
          // this.arr.unshift(obj)
          this.getAllposts()
          console.log(res)
          // this.patchForm.reset()
          this._snackbarservice.openSnackbar('post submited successfully....!!!')
        })
    } else {
      this._snackbarservice.openSnackbar('please type something....!!!')
    }

    // console.log(this.patchForm.get('title')?.value);
    // console.log(this.patchForm.controls['author'].value);
    //console.log(this.patchForm.get('title')?.value)
  }






  Onupdate() {
    if (this.patchForm.valid) {
      this._patchservice.patchpost(this.patchid, this.patchForm.value)
        .subscribe(res => {
          console.log(res)
          this.updateButton = false
          this.getAllposts()
          this.patchForm.reset()
          // this._patchservice.getAllpost()
          //   .subscribe(res => {
          //     this.arr = res
          //     t

          //   })
          this._snackbarservice.openSnackbar('post updated successfully....!!!')

          //  this.arr.forEach(e => {
          //    if (e.id ===this.patchid) {
          //      e.title = this.patchForm.controls['title'].value,
          //      e.author = this.patchForm.controls['author'].value
          //    this.patchForm.reset()
          //    }
          //  })
        })
    } else {
      this._snackbarservice.openSnackbar('please type something....!!!')
    }

  }




  Ondelete(id: string) {

    this._patchservice.deletePost(id)
      .subscribe(res => {
        console.log(res),
          this._snackbarservice.openSnackbar('post deleted successfully....!!!')
        console.log(id)
        this.getAllposts()


        // this.arr.forEach((e,i) => {
        //   if (e.id === id) {
        //     console.log(e);
        //     this.arr.splice(i,1)

        //   }
        // })

        // let find = this.arr.findIndex(e => e.id === id)
        // this.arr.splice(find, 1)

        // this.arr = this.arr.filter(e => e.id !== id)
      })
  }





  Onlogout() {

    this._auth.Onlogout()
    this._snackbarservice.openSnackbar('logout successfully....!!!')

  }
}



// patch madhe two method = editofsingle id and after that update so = ID lagel
// Delete = delte la pn = ID lagta


