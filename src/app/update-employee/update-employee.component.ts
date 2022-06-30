import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee:Employee=new Employee();
  id!: number;
  constructor(private employeeService:EmployeeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    console.log("Okay na!!!");
    this.id=this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee=data;
    }, error => console.log(error));
  }
  onSubmit(){
    this.employeeService.updateEmployee(this.id,this.employee).subscribe(data =>{
      console.log(data);
      this.goToEmployeeList();
    },error => {
      console.log(error);this.goToEmployeeList();});
    
  }
  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
}
