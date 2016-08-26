class DocumentsController < ApplicationController
  require 'json'

  layout 'api', only: [:index]

  def index
    @documents = Document.all
  end

  def new
  end

  def create
  end

  def delete
  end

  def edit
  end

  def update
  end
end
