import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'oidc-client';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile:Profile = {} as Profile;

  constructor(private profileService:RecipeService, private authService:SocialAuthService,) { }

  user: SocialUser = {} as SocialUser;
  loggedIn:boolean = false;
  weight:number=0;
  height:number=0;
  goal:string="";
  confirmation:boolean=false;
  // userId:string=""
  profile:boolean=false;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
      console.log(this.user.id);
      console.log(this.userProfile.userId);
      // this.getProfile();
      console.log(this.userProfile);
    });



    
  }

getProfile():void{
  this.profileService.getProfile(this.user.id).subscribe((
    response:Profile)=>{
        this.userProfile=response;
      this.profileExists();
    })
}


  addProfile(): void {
    this.userProfile.userId=this.user.id;
    this.profileService.addProfile(this.userProfile).subscribe((
      response:Profile)=>{
        this.userProfile=response;
        console.log(this.userProfile);
        console.log(this.user.id);
        this.getProfile();
      })

  }

deleteProfile():void{
  this.userProfile.userId=this.user.id;
  this.profileService.deleteProfile(this.userProfile.userId).subscribe((
    response:Profile)=>{
      this.userProfile=response;
      this.getProfile();
    }
  )
}

toggleAddedUser():void{
  this.confirmation=!this.confirmation;
}

heightMath(){
  let feet:number = Number(Math.floor(this.userProfile.height/12));
  let inches:number = Number(this.userProfile.height - (feet*12)); 
  return `${feet}' ${inches}"`
}

profileExists():void{
  // console.log(this.userProfile);
  // console.log(this.userProfile.height);
  // console.log(this.userProfile.weight);
if(!this.userProfile)
{
  this.profile=false;
}
else{
  this.profile=true;
}
}

updateProfile():void{
  this.userProfile.userId=this.user.id;
  this.profileService.updateProfile(this.userProfile.userId,this.userProfile.weight,this.userProfile.goal).subscribe((
    response:Profile)=>{
      this.userProfile=response;
      console.log(this.userProfile);
      console.log(this.user.id);
      this.getProfile();
    })
}
update:boolean=false

toggleUpdate(){
  this.update = !this.update;
}

}
