# TASK-A: FakeStore E-Commerce App

A modern e-commerce application built with Next.js (App Router) that integrates with the FakeStore API.

## Overview

This project demonstrates a full e-commerce flow including product browsing, authentication, protected routes, and user-specific cart management. It focuses on clean architecture, state persistence, and SEO best practices.

----------

## Features

-   View all products
-   Sorting and category filtering
-   Dynamic product detail pages    
-   Login support for multiple users (provided by FakeStore API)
-   Protected routes (Cart accessible only when logged in)
-   Add to cart
-   Update cart item quantity
-   Remove items from cart
-   Cart persistence per logged-in user (stored locally using Zustand)
-   SEO implementation:
    -   Metadata
    -   JSON-LD structured data
    -   Dynamic sitemap
-   Proxy API route for production compatibility

## Authentication

Users are authenticated using credentials provided by the FakeStore API.

Since the FakeStore API is public and not directly accessible in Vercel production, a proxy API route was implemented to securely forward requests.

### Test User Credentials

You can log in using the following sample users ( or any other user credentials from the FakeStore API ):

    Username: johnd
    Password: m38rmF$
    
    Username: mor_2314
    Password: 83r5^_
----------

## Cart Behavior

-   Cart is available only for authenticated users.
-   Each user has a separate cart tied to their user ID.
-   Cart data persists in local storage per user.
-   Cart automatically restores after page refresh when authenticated.
    

----------

## Tech Stack

-   Next.js (App Router)
-   TypeScript
-   Zustand (state management with persistence)
-   Tailwind CSS
-   FakeStore API (via proxy route)
    

----------

## SEO Implementation

-   Server-side metadata generation
-   JSON-LD structured data for product and collection pages
-   Dynamic sitemap generation for products
    

----------

## Notes

This project focuses on clean state management, proper authentication flow, user-scoped persistence, and production-ready SEO practices.