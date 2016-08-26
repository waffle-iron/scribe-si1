class UsersController < ApplicationController
  layout 'auth', only: [:new]

  # GET /register
  def new
  end

  # POST /register
  def create
  end
end
