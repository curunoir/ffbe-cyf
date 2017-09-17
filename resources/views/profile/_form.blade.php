<div class="row">
    <div class="col-sm-6">
        {!! BootForm::checkbox('status','Status',null) !!}
        {!! BootForm::text('ids','Ids',null,['required']) !!}
        {!! BootForm::textLang('title','Titre',['required']) !!}
        {!! BootForm::select('view','Vue',config('app.view_tour'),null,['required']) !!}
        {!! BootForm::select('position','Position',config('app.position_tour'),null,['required']) !!}
        {!! BootForm::text('level','Niveau') !!}
        {!! BootForm::text('fa','Font Awesome') !!}
        {!! BootForm::text('color','Couleur',null,['class' => 'colorpicker']) !!}
        {!! BootForm::file('picture','Image') !!}
        @if($tour->picture)
            <div class="text-right">
                <img src="/files/tour/{{$tour->view}}/{{$tour->picture}}" style="height:100px">
            </div>
        @endif
        {!! BootForm::textareaLang('description','Description',['class' => 'form-control summernote','rows' => 3]) !!}


    </div>
    <div class="col-sm-6">
        <ul class="notification-body">
            @foreach($permissions as $k => $v)
                <div class="col-sm-6">
                    <h3>{{config('roles.cat_roles')[$k]}}</h3>
                    <ul>
                        @foreach($v as $id => $p)
                            <li class="cursor-pointer listtypenone ">
                                {!! Form::checkbox('permissions[]',$id, in_array($id,$arrP)) !!}
                                {{trad($p)}}
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endforeach
        </ul>
    </div>

</div>

<div class="text-center margin-bottom-10">
    {!! BootForm::submit() !!}
</div>
@section('script')
    <script type="">
        $('#Form').validate();
        $('.colorpicker').colorpicker();
        $(document).ready(function () {
            $('.summernote').summernote({
                minHeight: 300,
                fontNames: ['Josefin Sans', 'Open Sans', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
                toolbar: [
                    // [groupName, [list of button]]

                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['font', ['fontname', 'fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                ]
            });
        });
    </script>
@endsection