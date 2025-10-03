@extends('master')

@section('content')

<h2>Create</h2>

@if (session()->has('message'))
    {{session()->get('message')}}
    </div>
@endif
<form action="{{ route('users.store') }}" method="POST">
    @csrf
    <input type="text" name="firstName" placeholder="Your firstName" >
    <input type="text" name="lastName" placeholder="Your lastName" >
    <input type="text" name="email" placeholder="Your email" >
    <input type="text" name="password" placeholder="Your password" value="123">
    <button type="submit">Create</button>
</form>

@endsection
