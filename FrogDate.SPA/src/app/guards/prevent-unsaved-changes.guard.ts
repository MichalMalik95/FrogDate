import { CanDeactivate } from "@angular/router";
import { UserEditComponent } from "../users/user-list/user-edit/user-edit.component";

export class PreventUnsavedChanges implements CanDeactivate<UserEditComponent>{
  canDeactivate(component:UserEditComponent){
    if(component.editForm.dirty){
      return confirm('You have unsaved changes on site. You want to continue without saving?');
    }
    return true;
  }
}
