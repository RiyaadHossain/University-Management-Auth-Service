import express from 'express'
import { AdminValidation } from './admin.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import { AdminController } from './admin.controller'
const router = express.Router()

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
)
router.get('/', AdminController.getAllAdmins)
router.get('/:id', AdminController.getAdmin)
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
)
router.delete('/:id', AdminController.deleteAdmin)

export const AdminRoute = router
