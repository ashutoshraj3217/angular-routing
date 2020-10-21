import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService,
     private route: ActivatedRoute 
    ) { }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
   
    // accessing query parameters and fragments using snapshot
    // this.route.snapshot.queryParams
    // this.route.snapshot.fragment 
   

    // accessing query parameters and fragments using observable
     this.route.queryParams.subscribe((queryParams: Params) => {
       console.log("=====",queryParams);
       this.allowEdit = queryParams['allowEdit'] === '1' ? true: false;
       console.log("><><><>",this.allowEdit); 
     });
     this.route.fragment.subscribe(fragment => {
       console.log("fragment",fragment)
     });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
