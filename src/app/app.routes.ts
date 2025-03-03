import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/logged/loged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate:[logedGuard],
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./pages/login/login.component').then(
                        (c) => c.LoginComponent
                    ),
                title: 'Login',
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./pages/register/register.component').then(
                        (c) => c.RegisterComponent
                    ),
                title: 'Register',
            },
            {
                path: 'Forgetpassword',
                loadComponent: () =>
                    import('./pages/forgetpassword/forgetpassword/forgetpassword.component').then(
                        (c) => c.ForgetpasswordComponent
                    ),
                title: 'Forgetpassword',
            }
        ],
    },
    {
        path: '',
        component: BlankLayoutComponent,
        children: [
            {
                path: 'home',
                loadComponent: () =>
                    import('./pages/home/home.component').then(
                        (c) => c.HomeComponent
                    ),
                title: 'Home',
                canActivate:[authGuard]
            },
            {
                path: 'brands',
                loadComponent: () =>
                    import('./pages/brands/brands.component').then(
                        (c) => c.BrandsComponent
                    ),
                title: 'Brands',
            },
            {
                path: 'cart',
                loadComponent: () =>
                    import('./pages/cart/cart.component').then(
                        (c) => c.CartComponent
                    ),
                title: 'Cart',
            },
            {
                path: 'categories',
                loadComponent: () =>
                    import('./pages/categaries/categaries.component').then(
                        (c) => c.CategariesComponent
                    ),
                title: 'Categories',
            },

            {
                path: 'Checkout/:id',
                loadComponent: () =>
                    import('./pages/checkout/checkout.component').then(
                        (c) => c.CheckoutComponent
                    ),
                title: 'Checkout',
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('./pages/products/products.component').then(
                        (c) => c.ProductsComponent
                    ),
                title: 'Products',
            },
            {
                path: 'Wishlist',
                loadComponent: () =>
                    import('./pages/wishlist/wishlist/wishlist.component').then(
                        (c) => c.WishlistComponent
                    ),
                title: 'Wishlist',
            },
            {
                path: 'allorders',
                loadComponent: () =>
                    import('./pages/allorders/allorders/allorders.component').then(
                        (c) => c.AllordersComponent
                    ),
                title: 'allorders',
            },
            {
                path: 'details/:id',
                loadComponent: () =>
                    import('./pages/details/details.component').then(
                        (c) => c.DetailsComponent
                    ),
                title: 'details',
            },
            { path: '**', component: NotfoundComponent },

        ],
    },
];
