import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import EmployeeManagement from '@/views/EmployeeManagement.vue'
import LeaveManagement from '@/views/LeaveManagement.vue'
import SalaryManagement from '@/views/SalaryManagement.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/employee',
    children: [
      {
        path: 'employee',
        name: 'Employee',
        component: EmployeeManagement
      },
      {
        path: 'leave',
        name: 'Leave',
        component: LeaveManagement
      },
      {
        path: 'salary',
        name: 'Salary',
        component: SalaryManagement
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router