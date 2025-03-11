import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, input, Input, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlexLayoutModule } from 'ngx-flexible-layout';

export interface MenuNode {
  name: string;
  icon?: string;
  redirect?: string;
  action?: string;
  class?: string;  
  children?: MenuNode[];
}

export interface MenuFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  icon?: string;
  redirect?: string;
  action?: string;
  class?: string;
}

@Component({
  selector: 'app-menu-three',
  standalone: true,
  imports: [MatTreeModule, MatIconModule, MatButtonModule, FlexLayoutModule],
  templateUrl: './menu-three.component.html',
  styleUrl: './menu-three.component.scss'
})
export class MenuThreeComponent implements OnInit {

  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,      
      level: level,
      icon: node.icon,
      redirect: node.redirect,
      action: node.action,
      class: node.class
    };
  };

  treeControl = new FlatTreeControl<MenuFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener<MenuNode, MenuFlatNode, MenuFlatNode>(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  listMenu = input<MenuNode[]>([]);  
  onClickElement = output<MenuFlatNode>();

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit(): void {
    this.dataSource.data = this.listMenu();
  }

  hasChild = (_: number, node: MenuFlatNode) => node.expandable;

  isChild(node: MenuFlatNode): boolean {
    return node.level > 0;
  }

}
