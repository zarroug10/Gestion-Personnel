import { Component } from '@angular/core';


@Component({
selector: 'app-home',
standalone: true,
imports: [],
templateUrl: './home.component.html'
})
export class HomeComponent {
public guidelines = [
{
title: 'Getting Started',
description: 'Welcome to the Personnel Management System. This application helps you manage your workforce efficiently.',
icon: '🚀'
},
{
title: 'Employee Management',
description: 'Add, edit, and manage employee information including personal details, contact information, and employment history.',
icon: '👥'
},
{
title: 'Department Organization',
description: 'Organize your workforce into departments and manage team structures effectively.',
icon: '🏢'
},
{
title: 'Leave Management',
description: 'Track and manage employee vacation requests and time-off records.',
icon: '🌴'
},
{
title: 'Work Time Logging',
description: 'Employees can submit daily reports detailing tasks accomplished and time spent.',
icon: '🕒'
},
{
title: 'Reports & Analytics',
description: 'Generate reports and view analytics about your workforce and department performance.',
icon: '📊'
}
];
}